
import React from "react";
import { 
  Check,
  CheckCircle,
  User,
  Mail,
  Phone,
  Star,
  X
} from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  check: Check,
  checkCircle: CheckCircle,
  user: User,
  mail: Mail,
  phone: Phone,
  close: X,
  star: Star,
};
