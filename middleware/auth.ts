// middleware/auth.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// 扩展Request接口以包含user属性
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

// 修改返回类型，确保函数不返回 Response 对象
export default function auth(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('x-auth-token');
    
    if (!token) {
        res.status(401).json({ msg: '无token，认证失败' });
        return; // 注意这里用return而不是直接返回res对象
    }
    
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = (decoded as any).user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'token无效' });
    }
}
