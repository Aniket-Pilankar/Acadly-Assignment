import React,{ useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import styled from 'styled-components'
const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

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

//   interface TableList{
//       id:number,
//       name:string,
//       avatarURL:string,

//   }

const InfiniteScrollList:React.FC = () => {
    const [items, setItems] = useState<any[]>([]);//** */
    const [noMore,setMore] = useState<boolean>(true)
    const [page,setPage] = useState<number>(2)
    console.log('items:', items)

    useEffect(() => {
        getStudentData()
    }, [])

    const getStudentData = async () => {
        const res = await axios.get(`http://localhost:3004/students?_page=1&_limit=20`);
        console.log('res:', res)
        setItems(res.data)
        // const data = await res.json()
        // console.log('data:', data)
    }

    // const getStudentData = () => {
    //     axios.get(`http://localhost:3004/students?_page=2&_limit=20`).then((res) => {
    //         console.log('res:', res)

    //     })
    // }

    const fetchData = async() => {
        const res = await axios.get(`http://localhost:3004/students?_page=${page}&_limit=20`);
        console.log('res1:', res)
        setItems([...items,...res.data])

        let {data} = res
        console.log('data:', data)
        if(data.length === 0 || data.length < 20){

            setMore(false)
        }
        setPage(page + 1)
        // console.log("object");
    }
  return (
    <div>
                  <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
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
                {/* <StyledTable></StyledTable> */}
                {/* {items.map((e) => (
                    // <div>
                    //     <p>{e.id}</p>
                    //     <p>{e.name}</p>
                    //     <p>{e.lecturesAttended}</p>
                    //     <p>{e.totalLectures}</p>
                    // </div>
                    
                ))} */}
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
                        {items.map((e) => (
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td><img src={e.avatarURL} alt="" /></td>
                        <td>{e.lecturesAttended}</td>
                        <td>{e.totalLectures}</td>
                    </tr>
                    
                ))}
                    </tbody>
                </StyledTable>
            </InfiniteScroll>
    </div>
  )
}

export default InfiniteScrollList
