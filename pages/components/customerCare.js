export default function customerCare() {
    return (
      <div className="">
        <div className="flex flex-col items-center h-[400px] justify-center mr-[95px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-center items-center">
              <img
                src="/ss.jpg"
                alt="Customer Service"
                className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
              />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start">
              <p className="text-center md:text-left text-sm md:text-base">
                Can’t find your desired service? Let us know 24/7 in 12126.
              </p>
              <button className="bg-[#1F53B7] hover:bg-[#1B3B9] hover:text-black text-white py-2 px-4 rounded w-[100px] md:w-[130px]">
                Request Service
              </button>
              <button className="bg-white hover:bg-[#1F53B7] hover:text-white border border-[#1F53B7] text-black py-2 px-4 rounded mt-2 w-[100px] md:w-[130px]">
                Call 12126
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  