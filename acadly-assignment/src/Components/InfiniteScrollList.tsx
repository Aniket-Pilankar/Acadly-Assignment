import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { allStudent, individualStudent } from '../Redux/InfiniteScroll/action';
import { useSelector } from 'react-redux';
const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;


  caption-side: bottom;

  td,
  th {
    border: none;
  }


  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;

const Container = styled.div`
  border: 10px solid red;
  display: flex;
  justify-content: space-between;
`
const FixedTable = styled.div`
  border:5px solid blue;
  width:50%;
  position:fixed;
  right: 0;
  `

  
  

const InfiniteScrollList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);//** */
  const [noMore, setMore] = useState<boolean>(true)
  const [page, setPage] = useState<number>(2)
  const [dialogShow, setDialogShow] = useState<boolean>(false)
  const dispatch = useDispatch()
  const allstudent_from_store = useSelector((store: any) => store.allstudents.studentlist)
  const individual_student_from_store = useSelector((store: any) => store.allstudents.individual_Student)
  console.log('individual_student_from_store:', individual_student_from_store)
  console.log('allstudent_from_store:', allstudent_from_store)
  console.log('items:', items)

  useEffect(() => {
    getStudentData()
  }, [])

  const getStudentData = async () => {
    const res = await axios.get(`http://localhost:3004/students?_page=1&_limit=20`);
    console.log('res:', res)
    setItems(res.data)
    dispatch(allStudent(res.data))
  }


  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3004/students?_page=${page}&_limit=20`);
    console.log('res1:', res)
    setItems([...items, ...res.data])
    dispatch(allStudent(res.data))
    let { data } = res
    console.log('data:', data)
    if (data.length === 0 || data.length < 20) {

      setMore(false)
    }
    setPage(page + 1)
    // console.log("object");
  }
  // style={{ display: 'flex' }}
  return (
    <Container >
      <div> <InfiniteScroll
        dataLength={allstudent_from_store.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      // // below props only if you need pull down functionality
      // refreshFunction={this.refresh}
      // pullDownToRefresh
      // pullDownToRefreshThreshold={50}
      // pullDownToRefreshContent={
      //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      // }
      // releaseToRefreshContent={
      //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
      // }
      >
        <StyledTable>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>avatarURL</th>
              <th>lecturesAttended</th>
              <th>totalLectures</th>
            </tr>
          </thead>
          <tbody>
            {allstudent_from_store.map((e: any) => (
              <tr key={e.id} onClick={() => {
                // console.log(e)

                axios.get(`http://localhost:3004/students/${e.id}`).then(({data}) => {
                  // console.log('data:', data)
                  

                  dispatch(individualStudent(data))
                  setDialogShow(true)
                })

              }} >
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td><img src={e.avatarURL} alt="student Images" /></td>
                <td>{e.lecturesAttended}</td>
                <td>{e.totalLectures}</td>
              </tr>

            ))}
          </tbody>
        </StyledTable>

      </InfiniteScroll>
      </div>
      
      <FixedTable>
      {dialogShow? <div>
        <StyledTable style={{}}>
          <thead>
            <tr>
              {/* <th>id</th> */}
              <th>name</th>
              <th>avatarURL</th>
              <th>lecturesAttended</th>
              <th>totalLectures</th>
              <th>mth101 subjectTitle</th>
              <th>mth101 marksObtained</th>
              <th>mth101 totalMarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{individual_student_from_store.name}</td>
              <td><img src={individual_student_from_store.avatarURL} alt='Student Image'/> </td>
              <td>{individual_student_from_store.lecturesAttended}</td>
              <td>{individual_student_from_store.totalLectures}</td>
              <td>{individual_student_from_store.marks.mth101.markesObtained}</td>
              <td>{individual_student_from_store.marks.mth101.subjectTitle}</td>
              <td>{individual_student_from_store.marks.mth101.totalMarks}</td>
            </tr>
          </tbody>
        </StyledTable>
        </div> : <h1>"Select Student to See their Details"</h1>}
        </FixedTable>
        
    </Container>
  )
}

export default InfiniteScrollList
