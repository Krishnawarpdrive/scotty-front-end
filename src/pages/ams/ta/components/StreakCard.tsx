
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const StreakCard: React.FC = () => {
  return (
    <div className="bg-white border min-w-60 min-h-[198px] grow shrink w-[312px] pt-[11px] pb-[23px] px-1.5 rounded-xl border-[rgba(246,246,246,1)] border-solid">
      <div className="flex w-full max-w-[352px] flex-col items-stretch">
        <div className="flex w-full items-center gap-[40px_100px] justify-between pl-3 py-[3px]">
          <div className="self-stretch flex items-center gap-1.5 font-medium whitespace-nowrap my-auto">
            <div className="text-[rgba(2,8,23,1)] text-sm self-stretch my-auto">
              Streak
            </div>
            <div className="text-black text-lg leading-none self-stretch my-auto">
              🔥14
            </div>
          </div>
          <div className="self-stretch flex items-center gap-1 text-xs text-black font-normal justify-between w-[110px] my-auto">
            <button aria-label="Previous period">
              <ChevronLeft className="h-3 w-3" />
            </button>
            <div className="self-stretch my-auto">12Apr - 19 Apr</div>
            <button aria-label="Next period">
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col mt-2 py-5">
          <div className="self-stretch gap-[40px_50px] text-[10px] text-[rgba(121,126,133,1)] font-normal whitespace-nowrap px-[35px] max-md:px-5">
            Mar
          </div>
          <div className="flex items-center gap-0.5 text-[10px] text-gray-600 font-normal whitespace-nowrap">
            {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, "01", "02", "03", "04"].map((day, index) => (
              <div key={index} className="self-stretch w-3 my-auto">
                {day}
              </div>
            ))}
          </div>
          <div className="w-full">
            <div className="flex w-full items-center gap-0.5 justify-center">
              <div className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
              </div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1 || index === 7) {
                  bgColor = "bg-[rgba(236,236,171,1)]";
                } else if (index === 6) {
                  bgColor = "bg-[rgba(236,193,171,1)]";
                }
                return (
                  <div key={`row1-${index}`} className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm`} />
                );
              })}
            </div>
            <div className="flex w-full items-center gap-0.5 justify-center">
              <div className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              </div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1 || index === 7) {
                  bgColor = "bg-[rgba(236,236,171,1)]";
                } else if (index === 6) {
                  bgColor = "bg-[rgba(236,214,171,1)]";
                }
                return (
                  <div key={`row2-${index}`} className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm`} />
                );
              })}
            </div>
            <div className="flex w-full items-center gap-0.5 justify-center">
              <div className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
              </div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1) {
                  bgColor = "bg-[rgba(236,236,171,1)]";
                }
                return (
                  <div key={`row3-${index}`} className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm`} />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-[40px_86px] justify-between mt-2">
          <div className="text-gray-600 text-xs font-normal self-stretch my-auto">
            Longest Streak: 95 days
          </div>
          <div className="self-stretch flex items-center gap-2 my-auto">
            <div className="text-gray-600 text-xs font-normal self-stretch my-auto">
              0%
            </div>
            <div className="self-stretch flex items-center gap-px my-auto">
              <div className="bg-[rgba(223,115,115,1)] self-stretch flex w-3 shrink-0 h-3 my-auto" />
              <div className="bg-[rgba(223,151,115,1)] self-stretch flex w-3 shrink-0 h-3 my-auto" />
              <div className="bg-[rgba(223,187,115,1)] self-stretch flex w-3 shrink-0 h-3 my-auto" />
              <div className="bg-[rgba(223,223,115,1)] self-stretch flex w-3 shrink-0 h-3 my-auto" />
              <div className="bg-[rgba(187,223,115,1)] self-stretch flex w-3 shrink-0 h-3 my-auto" />
            </div>
            <div className="text-gray-600 text-xs font-normal self-stretch my-auto">
              100%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
