
import React from "react";
import { Button } from "@/components/ui-mui/Button";
import { Filter, Plus } from "lucide-react";

export const ApplicationActions: React.FC = () => {
  return (
    <div className="bg-white flex w-full flex-col items-stretch text-[13px] font-medium text-center tracking-[0.1px] leading-loose justify-center mt-1 py-[3px] border border-gray-200 rounded-md max-md:max-w-full">
      <div className="bg-white flex w-full gap-[40px_100px] justify-between flex-wrap px-[30px] max-md:max-w-full max-md:px-5">
        <div className="flex items-center gap-[7px]">
          <Button variant="outlined" className="self-stretch flex min-h-9 flex-col overflow-hidden items-stretch justify-center w-[100px] my-auto rounded-md">
            Bulk Action
          </Button>
          <Button variant="outlined" className="self-stretch flex min-h-9 flex-col overflow-hidden items-stretch justify-center w-[63px] my-auto rounded-md">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-[7px] text-white w-[129px]">
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: 'rgba(0,153,51,1)', 
              '&:hover': { backgroundColor: 'rgba(0,133,41,1)' } 
            }}
            className="self-stretch flex min-h-9 w-[129px] flex-col overflow-hidden items-stretch justify-center my-auto rounded-md"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Application
          </Button>
        </div>
      </div>
    </div>
  );
};
