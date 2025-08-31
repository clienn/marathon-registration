import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  list(skip = 0, take = 20, search = '') {
    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { firstname: { contains: search, mode: 'insensitive' } },
            { middlename: { contains: search, mode: 'insensitive' } },
            { lastname: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};
    return this.prisma.user.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } });
  }

  count(search = '') {
    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { firstname: { contains: search, mode: 'insensitive' } },
            { middlename: { contains: search, mode: 'insensitive' } },
            { lastname: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};
    return this.prisma.user.count({ where });
  }

  create(data: {
    email: string;
    password: string;
    firstname?: string;
    middlename?: string;
    lastname?: string;
    phone?: string;
    address?: string;
    birthdate?: Date | string;
    sex?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    medicalNotes?: string;
    isActive?: boolean;
  }) {
    const hashed = bcrypt.hashSync(data.password, 10); // sync version
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash: hashed,
        firstname: data.firstname,
        middlename: data.middlename,
        lastname: data.lastname,
        phone: data.phone,
        address: data.address,
        birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
        sex: data.sex,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        medicalNotes: data.medicalNotes,
        isActive: data.isActive ?? true,
      },
    });
  }

  update(
    id: number,
    data: {
      email?: string;
      password?: string;
      firstname?: string;
      middlename?: string;
      lastname?: string;
      phone?: string;
      address?: string;
      birthdate?: Date | string;
      sex?: string;
      emergencyContactName?: string;
      emergencyContactPhone?: string;
      medicalNotes?: string;
      isActive?: boolean;
    },
  ) {
    const updateData: Prisma.UserUpdateInput = {};

    if (data.email !== undefined) updateData.email = data.email.toLowerCase().trim();
    if (data.password !== undefined) updateData.passwordHash = bcrypt.hashSync(data.password, 10);
    if (data.firstname !== undefined) updateData.firstname = data.firstname;
    if (data.middlename !== undefined) updateData.middlename = data.middlename;
    if (data.lastname !== undefined) updateData.lastname = data.lastname;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.birthdate !== undefined)
      updateData.birthdate = data.birthdate ? new Date(data.birthdate) : null;
    if (data.sex !== undefined) updateData.sex = data.sex;
    if (data.emergencyContactName !== undefined)
      updateData.emergencyContactName = data.emergencyContactName;
    if (data.emergencyContactPhone !== undefined)
      updateData.emergencyContactPhone = data.emergencyContactPhone;
    if (data.medicalNotes !== undefined) updateData.medicalNotes = data.medicalNotes;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}