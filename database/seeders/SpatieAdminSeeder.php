<?php

namespace Database\Seeders;

use App\Constants\Permissions;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class SpatieAdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
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
                'name' => 'Ezekiel',
                'password' => bcrypt('secret'),
            ]
        );

        $admin->assignRole('admin');
        $super->assignRole('super_admin');
    }
}
