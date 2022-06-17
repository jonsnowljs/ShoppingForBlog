import Flicking, { ViewportSlot } from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
// Or, if you have to support IE9
import '@egjs/react-flicking/dist/flicking-inline.css';
import { useEffect} from 'react';
import { Perspective, AutoPlay } from '@egjs/flicking-plugins';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from 'actions/productAction';
import { Link } from 'react-router-dom';
import './FlickCarousel.css'

export const FlickCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const {products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const plugins = [
    new Perspective({ rotate: 0.5 }),
    new AutoPlay({ duration: 5000, direction: 'NEXT', stopOnHover: true }),
  ];

  return (
    <>
      <Flicking
        circular={true}
        plugins={plugins}
        style={{ paddingBottom: '1rem' }}
      >
        {products.map((product) => (
          <Link to={`/products/${product._id}`}>
            <div className="card-panel">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  boxShadow:
                    '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                }}
              ></img>
              <span class="badge">Best Seller</span>
            </div>
          </Link>
        ))}
        <ViewportSlot>
          <span className="flicking-arrow-prev"></span>
          <span className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
    </>
  );
};
