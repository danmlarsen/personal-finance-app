import { Card, CardContent } from '@/components/ui/card';
import TransactionsList from './transactions-list';

export default function Transactions() {
  return (
    <div>
      <h1>Transactions</h1>
      <Card>
        <CardContent>
          <TransactionsList />
        </CardContent>
      </Card>
    </div>
  );
}
