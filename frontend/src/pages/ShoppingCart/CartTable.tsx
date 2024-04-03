import {
  styled,
  Button,
  ButtonGroup,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from '../../app/store';
import { ProductEntity } from '../../gql/graphql';
import { useMutation } from '@apollo/client';
import { UPDATE_PRODUCT } from '../../graphql/queries';
import ItemImage from './ItemImage';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CartTable = ({ products, target }: { products: ProductEntity[]; target: string }) => {
  const { cartCounter, wishlistCounter } = useAppSelector((store) => store.drawer);
  const [updateCartCounter] = useMutation(UPDATE_PRODUCT);

  const handleCartCounter = (product: ProductEntity, counterFlag: boolean) => {
    if (counterFlag) {
      updateCartCounter({
        variables: {
          id: product.id,
          cartCounter: product.attributes!.cartCounter! + 1,
        },
      });
    } else {
      if (product.attributes!.cartCounter! > 1) {
        updateCartCounter({
          variables: {
            id: product.id,
            cartCounter: product.attributes!.cartCounter! - 1,
          },
        });
      }
    }
  };

  return (
    <div className='table'>
      <Typography
        variant='h4'
        sx={{
          color: 'white',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Your {target == 'cart' ? 'shopping cart' : 'wishlist'}</span>
        <span>{target == 'cart' ? cartCounter : wishlistCounter} items</span>
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>PRODUCT</StyledTableCell>
              <StyledTableCell align='center'>DESCRIPTION</StyledTableCell>
              <StyledTableCell align='center'>SIZE</StyledTableCell>
              <StyledTableCell align='center'>COLOR</StyledTableCell>
              <StyledTableCell align='center'>QUANTITY</StyledTableCell>
              <StyledTableCell align='center'>PRICE</StyledTableCell>
              <StyledTableCell align='center'>TOTAL</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align='center'>
                  <ItemImage product={product} target={target} />
                </StyledTableCell>
                <StyledTableCell align='center'>{product.attributes?.name}</StyledTableCell>
                <StyledTableCell align='center'>{product.attributes?.size}</StyledTableCell>
                <StyledTableCell align='center'>{product.attributes?.color}</StyledTableCell>
                <StyledTableCell align='center'>
                  <ButtonGroup>
                    <Button aria-label='reduce' onClick={() => handleCartCounter(product, false)}>
                      <RemoveIcon fontSize='small' />
                    </Button>
                    <Button sx={{ fontSize: '1.8rem !important' }}>
                      {product.attributes?.cartCounter}
                    </Button>
                    <Button aria-label='increase' onClick={() => handleCartCounter(product, true)}>
                      <AddIcon fontSize='small' />
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
                <StyledTableCell align='center'>{product.attributes?.price}</StyledTableCell>
                <StyledTableCell align='center'>
                  {(product.attributes!.cartCounter! * product.attributes!.price).toFixed(2)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTable;
