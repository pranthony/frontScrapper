import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../partials/actions/FilterButton';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';

import Banner from '../partials/Banner';
import 'antd/dist/antd.css';
import { Input, Spin, Button } from 'antd';
import axios from 'axios';



function Dashboard() {
  const { Search } = Input;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchState, setSearchState] = useState(false)
  const [data, setData] = useState()

  useEffect(()=>{
    if(!data?.status){
      setSearchState(true)
      return
    }
    setTimeout(()=>{
        console.log("something")
    }, 3000)
    axios.get("/scrapp/"+value)
      .then(response=>{
        setData({...response})
    })
  },[data])
  const onSearch =(value)=>{
    value?setSearchState(true):console.log("none to send")
    
    console.log(value)
    axios.get("/scrapp/"+value)
      .then(response=>{
        setData({...response})
    })

  }
  const cancelarEnvio = ()=>{
    setSearchState(false)
  }
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}
              <DashboardAvatars />

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                {/* Datepicker built with flatpickr */}
                <Search
                  placeholder="que esta buscando..."
                  allowClear
                  enterButton="Recolectar"
                  size="large"
                  onSearch={onSearch}
                  loading={searchState}
                  disabled={searchState}
                  inputMode='text'
                  status=''
                />              
              </div>

            </div>

            {/* Cards */}
            <div className="grid">

              {/* Line chart (data view ) */}
              <div className="grid ">
                {searchState && 
                  <div className="grid place-content-center" style={{height: "50vh"}}>
                    <Spin size='large'/>
                    <p>Estamos procesando su solicitud</p>
                    <Button type="primary" danger onClick={cancelarEnvio}>
                      Cancelar
                    </Button>
                  </div>
                }
                {!searchState && <DashboardCard07 data={data}/>}
                

              </div>
              
              
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  );
}

export default Dashboard;