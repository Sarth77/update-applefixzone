import React from "react";

const UserAddresses = ({ addresses }) => {
  return (
    <div className="mb-5 gap-4">
      <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
        <div className="text-gray-600">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Name</div>
              <div className="px-4 py-2">{addresses?.name}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:jane@example.com">{addresses?.email}</a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No</div>
              <div className="px-4 py-2">{addresses?.mobile}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Address</div>
              <div className="px-4 py-2">{addresses?.address}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">City</div>
              <div className="px-4 py-2">{addresses?.city}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">State</div>
              <div className="px-4 py-2">{addresses?.state}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Pincode</div>
              <div className="px-4 py-2">{addresses?.pincode}</div>
            </div>

            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Country</div>
              <div className="px-4 py-2">{addresses?.country}</div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default UserAddresses;
