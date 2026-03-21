import { TableCell, TableRow } from '@/shared/components/atoms/ui/table';

type NoResultsTableProps = {
  columnsLength: number;
  tStates: (key: string) => string;
};

export default function NoResultsTable({
  columnsLength,
  tStates,
}: NoResultsTableProps) {
  return (
    <TableRow className="border-[#06B6D426] hover:bg-transparent">
      <TableCell
        colSpan={columnsLength}
        className="text-muted-foreground py-16 text-center text-base"
      >
        {tStates('noResults')}
      </TableCell>
    </TableRow>
  );
}
