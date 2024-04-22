import { useContext, useState } from 'react'
import { item } from './lists'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Context } from './Context'

export default function Items() {

  const $ = useContext(Context)
  const filter = useSelector(state => state.filter)
  const filtered = useSelector(state => state.filtered)
  const cart = useSelector(state => state.cart)
  const Dispatch = useDispatch()
  const pageSize = 6
  const [searching, setSearching] = useState([]);
  const startIndex = ($.currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = $.select ? $.filtered.slice(startIndex, endIndex) : filtered.slice(startIndex, endIndex);


  return (
    <>
      <div className='item_container'>
        <div className="buttons_container">
          <button onClick={() => Dispatch({ type: 'HIGH_TO_LOW' })}>High to low</button>
          <button onClick={() => Dispatch({ type: 'LOW_TO_HIGH' })}>low to High</button>
        </div>
        <div className="items_container">
          {filtered.length !== 0 ? (
            paginatedResults.map((i, item) => {
              return (
                <div className='items' key={Math.random()}>
                  <div className='items_img' style={{ background: `url(${i.picture}) no-repeat center center /cover` }}></div>
                  <h2>{i.name}</h2>
                  <p>{i.price}$</p>
                  <button onClick={() => {
                    if (!cart.includes(i)) {
                      Dispatch({ type: 'ADD_CART', payload: i })
                    }
                  }}>Add to Cart</button>
                </div>
              );
            }))
            : (<h2 className='empty'>items not found</h2>)}
        </div>
      </div>

      <div className="pagination">
        <button
          disabled={$.currentPage === 1}
          onClick={() => {
            $.setCurrentPage($.currentPage - 1)
          }}
          style={{ opacity: $.currentPage === 1 ? 0.4 : 1 }}
        >
          <HiOutlineArrowNarrowLeft />
        </button>
        <span>Page {$.currentPage}</span>
        <button
          disabled={$.select ? searching == '' ? endIndex >= $.filtered.length : endIndex >= searching.length : searching == '' ? endIndex >=  filtered.length : endIndex >= searching.length}
          onClick={() => {
            $.setCurrentPage($.currentPage + 1)
          }}
          style={{ opacity: $.select ? endIndex >= $.filtered.length ? 0.4 : 1 : endIndex >= filtered.length ? 0.4 : 1 }}
        >
          <HiOutlineArrowNarrowRight />
        </button>
      </div>
    </>
  )
}