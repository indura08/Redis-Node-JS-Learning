import { Router , Request, Response } from 'express';

const router = Router();

interface User{
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    {id: 1, name: "indura", email:"indura@gmail.com"},
    {id:2, name:"piyal", email:"piyal@gmail.com"},
    {id:3, name:"kamal", email:"kamal@gmail.com"}

]

router.get('/', (req:Request,res:Response) => {
    res.json(users);
} )

router.get('/:id', (req:Request, res:Response) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({ message: 'user not found'});
    }

    res.json(user);
})

router.post('/create', (req:Request, res:Response) => {
    const { name , email } = req.body;
    const newUser:User = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);
    res.status(200).json(newUser);
})

export default router;