<?php

namespace Database\Seeders;

use App\Constants\Permissions;
use App\Constants\Roles;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class SpatieAdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => Roles::ADMIN]);
        $superAdminRole = Role::firstOrCreate(['name' => Roles::SUPER_ADMIN]);
        $adminPanel = Permission::firstOrCreate(["name" => Permissions::ADMIN_PANEL]);

        $adminRole->givePermissionTo($adminPanel);


        $admin = User::firstOrCreate(
            ['email' => 'admin@amby.com'],
            [
                'name' => 'Princess',
                'password' => bcrypt('secret'),
            ]
        );

        $super = User::firstOrCreate(
            ['email' => 'emxhive@gmail.com'],
            [
                'name' => 'Ezekiel Okpako',
                'password' => bcrypt('secret'),
            ]
        );

        $admin->assignRole(Roles::ADMIN);
        $super->assignRole(Roles::SUPER_ADMIN);
    }
}
