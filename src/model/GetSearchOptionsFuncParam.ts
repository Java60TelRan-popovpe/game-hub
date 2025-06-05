import MenuItem from "./MenuItem";

interface GetSearchOptionsFuncParam {
    source: string;
    param: Record<string,string>
}

type GetOptionFilterFunction = <T extends MenuItem >(param: GetSearchOptionsFuncParam)=>{data: T[], error: string, isLoading: boolean};
export type { GetOptionFilterFunction, GetSearchOptionsFuncParam}