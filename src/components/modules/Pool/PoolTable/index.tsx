import { useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@material-tailwind/react";
import { useAppState } from "../../../../hooks";
import Columns from "./Columns";
import actions from "../../../../store/actions";
import { createPoolRows } from "../../../../helpers";

export default () => {
  const { state, dispatch } = useAppState();
  const poolRows = state?.poolRows;

  const table = useReactTable({
    columns: Columns(),
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  const init = () => {
    const poolRowsChainData = createPoolRows();
    dispatch({
      type: actions.SET_POOL_ROWS,
      payload: poolRowsChainData,
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Card className="bg-main-card py-4 px-2 rounded-md">
      <table>
        <thead className="text-secondary-text underline">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-lg font-semibold">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <div className="flex justify-center py-2.5 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
