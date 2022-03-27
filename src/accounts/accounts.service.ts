import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma.service';
import { Address, Bucket, Image, Profile, Review, User } from '@prisma/client';

import { CreateProfileDto } from 'accounts/dto/create-profile.dto';
import { UpdateProfileDto } from 'accounts/dto/update-profile.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  // * 프로필 생성을 위하여 사용 -> API 제외, User 와 연동해서 사용
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.prisma.profile.create({
      data: createProfileDto,
    });
  }

  async findProfileByUser(user: User): Promise<Profile> {
    return this.prisma.profile.findUnique({
      where: { userId: user.id },
    });
  }

  // * 프로필을 수정하기 위하여 사용
  async updateProfile(
    user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.profile.update({
      data: updateProfileDto,
      where: { id: profile.id },
    });
  }

  // * 프로필을 삭제하기 위하여 사용 -> API 제외, User 와 연동해서 사용
  async deleteProfile(id: number): Promise<void> {
    this.prisma.profile.delete({
      where: { id },
    });
  }

  // * 프로필 포인트 정산을 위하여 사용 -> API 제외, User 구매 시 사용
  async calculateProfilePoint(user: User): Promise<void> {
    const profile: Profile = await this.findProfileByUser(user);
    this.prisma.point.findMany({
      where: { id: profile.id },
    });
  }

  // * 프로필에 해당하는 배송지들을 우선순위를 기준으로 조회하기 위하여 사용
  async findProfileAddresses(user: User): Promise<Address[]> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.address.findMany({
      where: { profileId: profile.id },
      orderBy: [{ priority: 'desc' }],
      take: 5,
    });
  }

  async findImageById(id: number): Promise<Image> {
    return this.prisma.image.findUnique({
      where: { id },
    });
  }

  // * 프로필에 해당하는 업로드 이미지들을 업로드일을 기준으로 조회하기 위하여 사용
  async findProfileImages(user: User): Promise<Image[]> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.image.findMany({
      where: { profileId: profile.id },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  // * 특정한 이미지를 삭제하기 위하여 사용
  async deleteImage(imageId: number): Promise<void> {
    this.prisma.image.delete({
      where: { id: imageId },
    });
  }

  // * 특정한 이미지가 사용자의 것인지 확인하기 위하여 사용
  async isImageOwner(id: number, user: User): Promise<boolean> {
    const image: Image = await this.findImageById(id);
    const profile: Profile = await this.findProfileByUser(user);
    return image.profileId === profile.id;
  }

  // * 사용자가 작성한 리뷰들을 확인하기 위하여 사용
  async findMyReviewsByUser(user: User): Promise<Review[]> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.review.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  // * 사용자가 스크랩한 리뷰들을 확인하기 위하여 사용
  async findScrappedReviewsByUser(
    user: User,
  ): Promise<{ scrapedReviews: Review[] }> {
    return this.prisma.profile.findUnique({
      where: { userId: user.id },
      select: {
        scrapedReviews: {
          include: { profile: true },
        },
      },
    });
  }

  // * 사용자가 좋아요한 리뷰들을 확인하기 위하여 사용
  async findLikedReviewsByUser(
    user: User,
  ): Promise<{ likedReviews: Review[] }> {
    return this.prisma.profile.findUnique({
      where: { userId: user.id },
      select: {
        likedReviews: {
          include: { profile: true },
        },
      },
    });
  }

  // * 프로필에 해당하는 버킷리스트들을 조회하기 위하여 사용
  async findProfileBucketLists(user: User): Promise<Bucket[]> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.bucket.findMany({
      where: { profileId: profile.id, isPurchase: false },
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  // * 버킷의 현재 상태를 조회하기 위하여 사용 (상태 변경을 편하게 하기 위하여)
  private async findBucket(id: number): Promise<Bucket> {
    return this.prisma.bucket.findUnique({
      where: { id },
    });
  }

  // * 버킷리스트의 상태를 변경하기 위하여 사용
  async changeBucketStatus(id: number): Promise<Bucket> {
    const bucket: Bucket = await this.findBucket(id);
    return this.prisma.bucket.update({
      where: { id },
      data: {
        isPurchase: !bucket.isPurchase,
      },
    });
  }

  async isBucketOwner(id: number, user: User): Promise<boolean> {
    const bucket: Bucket = await this.findBucket(id);
    const profile: Profile = await this.findProfileByUser(user);
    return bucket.profileId === profile.id;
  }

  // * 프로필에 해당하는 장바구니 상품들을 조회하기 위하여 사용
  async findProfileShoppingLists(user: User): Promise<Bucket[]> {
    const profile: Profile = await this.findProfileByUser(user);
    return this.prisma.bucket.findMany({
      where: { profileId: profile.id, isPurchase: true },
      orderBy: [{ createdAt: 'desc' }],
    });
  }
}
