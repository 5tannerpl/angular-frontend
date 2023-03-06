import { Observable } from "rxjs";
import { visitList } from "../models/dashboard.model";

export interface IDashboardMockService{
    getVisitList(): Observable<visitList[]>; 
}