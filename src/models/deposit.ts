interface Transaction {
  hash: string,
  amount: number,
  address_from: string,
  address_to: string,
  id: number,
  user_id: number,
  status: string,
  comment: string,
  created_at: number,
  updated_at: number
}

export interface  Deposit{
  user_id: number,
  amount: number,
  id: number,
  ton_transaction: Transaction,
  status: string
}
