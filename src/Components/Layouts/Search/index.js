import React, { useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Sidebar from '../../Navigation/Sidebar'
import Navbar from '../../Navigation/Navbar'
import { Table, Pagination, Input, Button } from 'antd'
import { ActionCreators } from '../../../Store/ActionCreators'
import moment from 'moment'
import 'antd/dist/antd.css'
import exportFromJSON from 'export-from-json'
import excel from '../../../assets/images/excel.PNG'

import './Search.css'

const { Search } = Input

const Explore = (props) => {

    const [pageIndex, setPageIndex] = useState(0)
    const [_limit, setLimit] = useState(20)
    const [visible, setVisible] = useState(false)

    const [column ,setColumn] = useState(true)

    // const total = useSelector(state => state.totalCases)
    const user = useSelector(state => state.user)
    const loading = useSelector(state => state.loading)
    const explore = useSelector(state => state.exploreViolations)

    const dispatch = useDispatch()
    
    let pageSize, pageNumber, limit, total, violations
    
    pageSize = explore && explore.pages
    limit = explore && explore.limit
    pageNumber = explore && explore.page
    total = explore && explore.total
    violations = explore && explore.violations
    
    // console.log(violations,'object')

    useEffect(() => {
        getcases()
    },[])

    const getcases = () => dispatch(ActionCreators.getExploreViolation(user._id, pageIndex, _limit))

    const columns = [
        {
            title: 'Reporter',
            dataIndex: 'reporter',
            key: 'reporter',
            align:'left',
            // width:'160px',
        },
        {
            title: 'District',
            dataIndex: 'district',
            key: 'district',
            align:'left',
            // width:'100px'
        },
        {
            title: 'Village',
            dataIndex: 'town',
            key: 'town',
            align:'left',
            // width:'160px'
        },
        {
            title: 'Violation',
            dataIndex: 'violation',
            key: 'violation',
            align:'left'
            // width:'160px'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            align:'left',
            hidden: column
            // width:'160px'
        },
        {
            title: 'Authorities',
            dataIndex: 'authorities',
            key: 'authorities',
            align:'left',
            hidden: column
            // width:'160px'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align:'left',
            width:'140px',
            render: (r) => (
                <span 
                style={{
                    background: r === 'resolved' ? '#b7eb8f' : '#ffbb96', 
                    padding: '5px', 
                }}
                >
                    <text style={{color: r === 'resolved' ? '#008050' : '#d4380d'}}>{r}</text>
                </span>
            )
        },
        {
            title: 'Victim\`s Gender',
            dataIndex: 'gender',
            key: 'gender',
            align:'left',
            // width:'80px'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            align:'left',
            width:'140px',
        }
    ].filter(item => !item.hidden)

    // violations.sort((a,b) => moment(a.reportedDateAndTime).format("MMM Do YY") - moment(b.reportedDateAndTime).format("MMM Do YY") )

    const fileName = 'Report'  
    const exportType = exportFromJSON.types.csv
    let data = [...violations.map(r => 
    ({...r, 
      status: r.status.value, 
      status: r.status.value, 
      district: `${r.location.district} `,
      town: `${r.location.name}`,
      gender: r.involved.map(a => a.relevantLinks)[0].map(g => g.link).slice(-1).pop(),
      reporter: `${r.reporter.name} - ${r.reporter.contact}`, 
      authorities: r.authorityResponse.map(a => a.name).join(), 
      authorityResponse: r.authorityResponse.map(a => a.response).join(), 
      injuries: r.injuries.map(j => j.description).join(), 
      otherInfo: r.otherInfo.map(o => o.description).join(), 
      actions: r.actions.map(a => a.description).join(), 
      evidence: r.evidence.map(e => e.link).join(), 
      narratives: r.narratives.map(n => n.description).join(), 
      involved: r.involved.map(i => i.name).join()
    })
    )]


    const exportToexcel = () => {
    exportFromJSON({ data, fileName,exportType})
  }

    return (
        <div>
            <Navbar/>
            <div className="search-main">
            <div className="left-column">
                <Sidebar/>
            </div>
            <div className="right-column">
                <div className="search-header">
                    {/* <Search
                        className='search-input'
                        onClick={() => dispatch(ActionCreators.getSearchViolation(user._id, 10, "Nyeko Martin"))}
                    /> */}
                    <div onClick={exportToexcel} className="download-excel">
                        <img src={excel}/>
                        <h4>Download</h4>
                    </div>
                    <div className="toggle-buttons">
                        <button onClick={() => setColumn(false)}>view more</button>
                        <button onClick={() => setColumn(true)}>view less</button>
                    </div>
                        {loading ? <p >Loading.....Please Wait</p> : null}
                        <div className="pagination">
                            {visible ? 
                                <button 
                                onClick={() => {
                                    getcases()
                                    setVisible(false)
                                }}>
                                    Go To First Page
                                    </button> 
                                    : null
                            }
                            <Pagination 
                                defaultCurrent={1}
                                current={pageNumber}
                                pageSize={limit}
                                total={total}
                                onChange={() => {
                                    dispatch(ActionCreators.getExploreViolation(user._id, pageNumber, limit))
                                    setVisible(true)
                                }}
                            />
                        </div>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={[...violations.map(r => 
                        ({...r, 
                        status: r.status.value,  
                        district: `${r.location.district} `,
                        town: `${r.location.name}`,
                        violation: `${r.type}`,
                        reporter: `${r.reporter.name}` , 
                        phone: `${r.reporter.contact}`, 
                        authorities: r.authorityResponse.map(a => a.name).join(), 
                        gender: r.involved.map(a => a.relevantLinks)[0].map(g => g.link).slice(-1).pop(), 
                        date: `${moment(r.reportedDateAndTime).calendar()}`
                        })
                        )]} 
                    style={{width:'100%', marginBottom:'5rem'}} 
                    pagination={false} 
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => props.history.push("./case-details", {violation: record})
                        }
                    }}
                />
            </div>
        </div>
        </div>
    )
}

export default Explore
