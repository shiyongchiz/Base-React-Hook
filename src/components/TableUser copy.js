import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react';
import { fetAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddNew';
const TableUsers = (props) => {
  const [listUser, setListUser] = useState([])
  const [totalUser, setTotalUser] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [isShowModelAddNew, setIsShowModelAddNew] = useState(false)

  const handleClose = () => {
    setIsShowModelAddNew(false)
  }

  const handleUpdateUser = (user) => {
    setListUser([user,...listUser])
  }
  useEffect(() => {
    //cal apis
    getUSers(1);
  }, [])


  const getUSers = async (page) => {
    let res = await fetAllUser(page);
    if (res && res.data) {
      setListUser(res.data)
      setTotalUser(res.total)
      setTotalPage(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    getUSers(+event.selected + 1);
  }
  return (<>
    <div className='my-3 add-new'>
      <span> List Users  </span>
      <button className='btn btn-success' onClick={() => {
        setIsShowModelAddNew(true);
      }}>
        Add new user
      </button>
    </div>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>

        </tr>
      </thead>
      <tbody>
        {listUser && listUser.length > 0 && listUser.map((item, index) => {
          return (
            <tr key={`user-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
            </tr>
          )
        })
        }

      </tbody>
    </Table>
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPage}
      previousLabel="< previous"

      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination'
      activeClassName='active'
    />
    <ModelAddNew
      show={isShowModelAddNew}
      handleClose={handleClose}
      handleUpdateUser={handleUpdateUser}
    >
    </ModelAddNew>
  </>
  )
}

export default TableUsers;