import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ){}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId: id
    })
    if(!region) throw new NotFoundException('Region not found');
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const location = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })
    if(!location) throw new NotFoundException();
    return this.regionRepository.save(location);
  }

  remove(id: number) {
    return this.regionRepository.delete({
      regionId: id
    })
  }
}
