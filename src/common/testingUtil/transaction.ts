import { PrismaClient } from '@prisma/client';

type CtorParams<C> = C extends new (...args: infer P) => any ? P[0] : never;
type TxClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];
const ROLLBACK = { [Symbol.for('prisma.client.extension.rollback')]: true };

async function $begin(client: PrismaClient) {
  let setTxClient: (txClient: TxClient) => void;
  let commit: () => void;
  let rollback: () => void;

  // a promise for getting the tx inner client
  const txClient = new Promise<TxClient>((res) => {
    setTxClient = (txClient) => res(txClient);
  });

  // a promise for controlling the transaction
  const txPromise = new Promise((_res, _rej) => {
    commit = () => _res(undefined);
    rollback = () => _rej(ROLLBACK);
  });

  // opening a transaction to control externally
  const tx = client.$transaction((txClient) => {
    setTxClient(txClient as TxClient);

    return txPromise.catch((e) => {
      if (e === ROLLBACK) return;
      throw e;
    });
  });

  return Object.assign(await txClient, {
    $commit: async () => {
      commit();
      await tx;
    },
    $rollback: async () => {
      rollback();
      await tx;
    },
  } as TxClient & { $commit: () => Promise<void>; $rollback: () => Promise<void> });
}

// patches the prisma client with a $begin method
export function getTxClient(options?: CtorParams<typeof PrismaClient>) {
  const client = new PrismaClient(options);

  return Object.assign(client, {
    $begin: () => $begin(client),
  }) as PrismaClient & { $begin: () => ReturnType<typeof $begin> };
}
