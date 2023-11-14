import type {RowDataPacket} from 'mysql2'
import { ModifyQuery, SelectQuery } from './queryUtils';

export interface UserEntity extends RowDataPacket{
    id: number,
    firstname?: string,
    lastname?: string,
    birthdate?: Date,
    email: string,
    followers: number,
    isBanned: boolean
}

export function getAllUsers(){
    return SelectQuery<UserEntity>('SELECT * FROM User;');
}

export function getOneUser(id: string){
    const queryString = 'SELECT * FROM User WHERE id = ?;'
    return SelectQuery<UserEntity>(queryString, [id]);
}

export function getByNameSurname(firstname: string, lastname: string){
    const queryString = 'SELECT * FROM User WHERE firstname = ? AND lastname = ?';
    return SelectQuery<UserEntity>(queryString, [firstname, lastname]);
}

export function createUser(newUser: {firstname: string, lastname: string, email: string}){
    const queryString = 'INSERT INTO User SET ?'
    return ModifyQuery(queryString, [newUser]);
}

export function updateUser(updatedUser: {firstname?: string, lastname?: string, email?: string}, id: number){
    const queryString = 'UPDATE User SET ? WHERE id = ?';
    return ModifyQuery(queryString, [updatedUser, id]);
}

export function deleteUser(id: number){
    const queryString = 'DELETE FROM User WHERE id = ?';
    return ModifyQuery(queryString, [id]);
}