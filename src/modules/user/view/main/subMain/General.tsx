/* eslint-disable @next/next/no-img-element */
// import { getPicture } from '@/config/client'
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
} from '@mui/material'
import React, {  } from 'react'
import { BsBoxSeam, BsShop } from 'react-icons/bs'
import { FiDivideCircle } from 'react-icons/fi'
import { LiaUserShieldSolid } from 'react-icons/lia'
import { RxDashboard } from 'react-icons/rx'
import { SlPeople } from 'react-icons/sl'
import { TbPackages, TbCategory, TbSettingsCheck } from 'react-icons/tb'
import { FaMoneyBillWave } from 'react-icons/fa'

const GeneralTabUser = () => {
  // const basePic = `${process.env.basePath}/man.png`
  // const urlPic = getPicture() || basePic

  const services = [
    {
      id: 1,
      name: 'Dashboard',
      mode: 'Monitor',
      details: [{ name: 'History', package: '30 day' }],
    },
    {
      id: 2,
      name: 'User',
      mode: 'Management',
      details: [
        { name: 'User', package: '1/5 user' },
        { name: 'Role', package: '1/5 role' },
      ],
    },
    {
      id: 3,
      name: 'Inventory',
      mode: 'Management',
      details: [
        { name: 'Item', package: '0/250 item' },
        { name: 'brand', package: '1/50 brand' },
        { name: 'type', package: '1/50 type' },
      ],
    },
    {
      id: 4,
      name: 'Sales',
      mode: 'Management',
      details: [{ name: 'History Bill', package: '30 day' }],
    },
    {
      id: 5,
      name: 'Customer',
      mode: 'Management',
      details: [{ name: 'Customer', package: '0/100' }],
    },
    {
      id: 5,
      name: 'Customer',
      mode: 'Management',
      details: [{ name: 'Customer', package: '0/100' }],
    },
  ]

  const IconServices = ({ value }) => {
    return (
      <>
        {/* {value === 0 && <RiHome4Line />} */}
        {value === 1 && <RxDashboard />}
        {value === 3 && <BsBoxSeam />}
        {value === 4 && <FiDivideCircle />}
        {value === 5 && <SlPeople />}
        {value === 2 && <LiaUserShieldSolid />}
      </>
    )
  }

  const ListItems = () => {
    const sr = services.map((e) => {
      const details: any = e?.details?.map((d) => {
        return (
          <div
            key={d.name}
            className="flex  px-[10px] rounded-xl !drop-shadow-sm gap-[10px] justify-between">
            <p className="font-normal m-0 !text-primary">{d?.name} :</p>
            <p className="font-normal m-0  !text-primary">{d?.package}</p>
          </div>
        )
      })

      return (
        <ListItem
          key={e.id}
          className="flex flex-col !rounded-xl !drop-shadow !bg-white mt-[15px]">
          <div className="flex justify-between w-full ">
            <div className="flex items-center">
              <ListItemAvatar>
                <Avatar className="!bg-violet-300">
                  {IconServices({ value: e.id })}
                </Avatar>
              </ListItemAvatar>
              <div>
                <p className="text-primary font-normal m-0">{e.name}</p>
                <p className="text-secondary font-normal m-0">{e.mode}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] my-auto w-full mt-[15px]">
            <div className="lg:grid lg:grid-cols-2">
              <div>{details}</div>
            </div>
          </div>
        </ListItem>
      )
    })

    return sr
  }

  const profiles = [
    {
      id: 1,
      name: 'Shop name',
      value: 'firstzaxzshot',
    },
    {
      id: 4,
      name: 'Category',
      value: 'Pet shop',
    },
    {
      id: 2,
      name: 'Package',
      value: 'Starter',
    },
    {
      id: 3,
      name: 'Billing(฿)',
      value: '1500/M',
    },
  ]

  const IconProfile = ({ value }) => {
    return (
      <>
        {/* {value === 0 && <RiHome4Line />} */}
        {value === 1 && <BsShop />}
        {value === 2 && <TbPackages />}
        {value === 3 && <FaMoneyBillWave />}
        {value === 4 && <TbCategory />}
      </>
    )
  }

  const ListProfiles = () => {
    const sr = profiles.map((e) => {
      return (
        <ListItem
          key={e.id}
          className=" !rounded-xl !drop-shadow !bg-white mt-[15px]">
          <div className="flex justify-between w-full ">
            <div className="flex items-center">
              <ListItemAvatar>
                <Avatar className="!bg-violet-300">
                  {IconProfile({ value: e.id })}
                </Avatar>
              </ListItemAvatar>
              <div>
                <p className="text-primary font-normal m-0">{e.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] my-auto justify-center">
              {e.value}
            </div>
          </div>
        </ListItem>
      )
    })

    return sr
  }

  return (
    <div className="p-[15px]">
      <div className="flex items-center gap-[15px]">
        <h2 className="font-medium text-primary">March Backoffice</h2>
        <h3 className="font-normal bg-amber-500 w-fit h-fit rounded-xl px-[5px] text-white">
          Starter
        </h3>
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-4 overflow-y-hidden">
        <div className="px-[15px] ">
          <h3 className="font-medium text-primary m-0">Services</h3>
          <div className="lg:overflow-y-auto lg:h-auto lg:max-h-[calc(100vh-350px)]">
            <List className="!px-[10px]">{ListItems()}</List>
          </div>
        </div>

        <div className="w-full mt-[15px] lg:mt-0">
          <div className="flex gap-[15px] justify-between items-center">
            <h3 className="font-medium text-primary m-0">Profile</h3>
            <TbSettingsCheck
              size={20}
              className="bg-violet-700 text-white rounded-full p-[2px] cursor-pointer"
            />
          </div>
          <List className="!px-[10px]">{ListProfiles()}</List>
        </div>
      </div>
    </div>
  )
}

export default GeneralTabUser
