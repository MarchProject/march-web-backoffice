import React from 'react'
import { MdCancel } from 'react-icons/md'

const Access = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center  items-center h-screen">
        <div className="text-center">
          <MdCancel size={140} className="text-red-500" />
          <h2 className="text-primary">Access Denied</h2>
          <p className="text-secondary">
            You do not have permission to view this site.
          </p>
          {/* <p className="text-secondary">
            Please check your credentials and try again.
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Access
