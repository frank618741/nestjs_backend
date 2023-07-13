import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from 'src/entities/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
      ) {}
    
      async create(auth: Auth) {
        const tempauth = await this.authRepository.create(auth);
        return await this.authRepository.save(tempauth);
      }
    
      findAll() {
        return this.authRepository.find();
      }
    
      findOne(id: number) {
        return this.authRepository.findOne({
          where: { id },
        });
      }
    
      async update(id: number, auth: Partial<Auth>) {
        // return await this.authRepository.update(id, auth);
        const tempAuth = await this.findOne(id);
        const newAuth =  await this.authRepository.merge(tempAuth,auth);
    
        return await this.authRepository.save(newAuth);
      }

      async remove(id: number) {
        const tempAuth = await this.findOne(id);
        return await this.authRepository.remove(tempAuth);
      }


}
