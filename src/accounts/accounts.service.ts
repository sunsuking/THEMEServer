import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { Address, Bucket, Image, Profile } from '@prisma/client';

import { CreateProfileDto } from 'accounts/dto/create-profile.dto';
import { UpdateProfileDto } from 'accounts/dto/update-profile.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  // 프로필 정보를 조회하기 위하여 사용
  async findProfile(id: number): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  // 프로필 생성을 위하여 사용
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  // 프로필을 수정하기 위하여 사용
  async updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.prisma.profile.update({
      data: updateProfileDto,
      where: { userId: id },
    });
  }

  // 프로필을 삭제하기 위하여 사용
  async deleteProfile(id: number): Promise<void> {
    this.prisma.profile.delete({
      where: { id },
    });
  }

  // 프로필 포인트 정산을 위하여 사용
  async calculateProfilePoint(profile: Profile): Promise<void> {
    this.prisma.point.findMany({
      where: { id: profile.id },
    });
  }

  // 프로필에 해당하는 배송지들을 우선순위를 기준으로 조회하기 위하여 사용
  async findProfileAddresses(profile: Profile): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { profileId: profile.id },
      orderBy: [{ priority: 'desc' }],
    });
  }

  // 프로필에 해당하는 업로드 이미지들을 업로드일을 기준으로 조회하기 위하여 사용
  async findProfileImages(profile: Profile): Promise<Image[]> {
    return this.prisma.image.findMany({
      where: { profileId: profile.id },
      // orderBy: [{ createdAt: 'desc' }]
    });
  }

  // 특정한 이미지를 삭제하기 위하여 사용
  async deleteImage(imageId: number): Promise<void> {
    this.prisma.image.delete({
      where: { id: imageId },
    });
  }

  // 프로필에 해당하는 버킷리스트들을 조회하기 위하여 사용
  async findProfileBucketLists(profile: Profile): Promise<Bucket[]> {
    return this.prisma.bucket.findMany({
      where: { profileId: profile.id, isPurchase: false },
      // orderBy: [{ createdAt: 'desc' }]
    });
  }

  // 버킷의 현재 상태를 조회하기 위하여 사용 (상태 변경을 편하게 하기 위하여)
  private async findBucket(id: number): Promise<Bucket> {
    return this.prisma.bucket.findUnique({
      where: { id },
    });
  }

  // 버킷리스트의 상태를 변경하기 위하여 사용
  async changeBucketStatus(id: number): Promise<Bucket> {
    const bucket: Bucket = await this.findBucket(id);
    return this.prisma.bucket.update({
      where: { id },
      data: {
        isPurchase: !bucket.isPurchase,
      },
    });
  }

  // 프로필에 해당하는 장바구니 상품들을 조회하기 위하여 사용
  async findProfileShoppingLists(profile: Profile): Promise<Bucket[]> {
    return this.prisma.bucket.findMany({
      where: { profileId: profile.id, isPurchase: true },
      // orderBy: [{ createdAt: 'desc' }]
    });
  }
}
