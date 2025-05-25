
import React from "react";

export const Sidebar: React.FC = () => {
  return (
    <div className="z-10 flex gap-[13px] mt-[61px] pt-[13px] pb-[345px] px-[13px] max-md:mt-10 max-md:pb-[100px]">
      <div className="border-[color:var(--WD-Primary-Light-Grey,#6C6F70)] p-[5px] rounded-[10.7px] border-[1.338px] border-solid">
        <div className="items-center border-b-[color:var(--WD-Primary-WarpDrive-Green,#17B14A)] opacity-80 flex w-full gap-[11px] px-2.5 py-[11px] rounded-[10.7px] border-b-[2.675px] border-solid">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/25889db59c134c85b898ae1ece50f3df/5da730a2cfbe093956678238fba9a7d6d3153b2e?placeholderIfAbsent=true" 
            className="aspect-[1.03] object-contain w-[33px] self-stretch my-auto" 
            alt="Application icon" 
          />
        </div>
        <img 
          src="https://cdn.builder.io/api/v1/image/assets/25889db59c134c85b898ae1ece50f3df/820663902194243bc14302ba29d147df39044e38?placeholderIfAbsent=true" 
          className="aspect-[0.12] object-contain w-[53px] mt-[5px]" 
          alt="Sidebar indicator" 
        />
      </div>
    </div>
  );
};
