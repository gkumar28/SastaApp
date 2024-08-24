import { IUserRouteRequest } from "../interface/request";
import { User } from "../model/user";

export const mapUserRequestToUser = (userRequest: IUserRouteRequest, user: User = new User()) => {
    user.firstName = userRequest.firstName
    user.lastName = userRequest.lastName
    user.email = userRequest.email
    user.password = userRequest.password
    user.username = userRequest.username

    return user;
}