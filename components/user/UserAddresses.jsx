import React from "react";

const UserAddresses = ({ addresses }) => {
  return (
    <div className="mb-5 gap-4">
      <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
        <div className="text-gray-600 w-full">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Name</div>
              <div className="px-4 py-2">{addresses?.name || "Not provided"}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email</div>
              <div className="px-4 py-2">
                {addresses?.email ? (
                  <a 
                    className="text-blue-800 hover:underline" 
                    href={`mailto:${addresses.email}`}
                    title="Click to send email"
                  >
                    {addresses.email}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No</div>
              <div className="px-4 py-2">
                {addresses?.mobile ? (
                  <a 
                    className="text-blue-800 hover:underline" 
                    href={`tel:${addresses.mobile}`}
                    title="Click to call"
                  >
                    {addresses.mobile}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Address</div>
              <div className="px-4 py-2">{addresses?.address || "Not provided"}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">City</div>
              <div className="px-4 py-2">{addresses?.city || "Not provided"}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">State</div>
              <div className="px-4 py-2">{addresses?.state || "Not provided"}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Pincode</div>
              <div className="px-4 py-2">{addresses?.pincode || "Not provided"}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Country</div>
              <div className="px-4 py-2">{addresses?.country || "India"}</div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default UserAddresses;
