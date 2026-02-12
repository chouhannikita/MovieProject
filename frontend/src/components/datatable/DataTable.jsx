import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const DataTable = ({ columns, data, rowKey, loading }) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "400px",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row) => (
              <TableRow key={row[rowKey]}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default DataTable;
