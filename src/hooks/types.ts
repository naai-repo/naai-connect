import { responseWrapperType } from "@/services/responseWrapper";
import { SingleSalonResponseType } from "@/services/salon/types";

export type SingleSalonResponseControllerType = responseWrapperType & {
  data: SingleSalonResponseType;
};