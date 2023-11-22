import { useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@material-tailwind/react";
import { createPoolRows } from "../../../../helpers";
import { PoolRow } from "../../../../types";
import Columns from "./Columns";
import RowDataProvider from "./RowDataProvider";

const JUSTIFY_CENTER_INDICIES = [0, 6, 7, 8];

type Props = {
  poolRows: PoolRow[];
  setPoolRows: React.Dispatch<React.SetStateAction<PoolRow[]>>;
};

export default ({ poolRows, setPoolRows }: Props) => {
  const table = useReactTable({
    columns: Columns({ setPoolRows }),
    data: poolRows,
    getCoreRowModel: getCoreRowModel(),
  });

  const init = () => {
    const poolRowsChainData = createPoolRows();
    setPoolRows(poolRowsChainData);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Card className="bg-main-card py-4 px-2 rounded-lg">
      <table>
        <thead className="text-secondary-text">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="pb-2">
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
        <tbody className="text-[17px] font-semibold">
          {table.getRowModel().rows.map((row, indexRow) => (
            <tr key={row.id}>
              <RowDataProvider
                chainIdRow={row.getValue("chainId")}
                collateralRow={row.getValue("collateral")}
                setPoolRows={setPoolRows}
                index={indexRow}
              />
              {row.getVisibleCells().map((cell, indexCell) => (
                <td key={cell.id}>
                  <div
                    className={`flex py-2.5 px-4 ${
                      JUSTIFY_CENTER_INDICIES.includes(indexCell)
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
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
