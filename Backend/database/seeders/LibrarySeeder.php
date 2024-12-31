<?php

namespace Database\Seeders;

use App\Models\BooksModel;
use App\Models\User;
use App\Models\Member;
use Illuminate\Support\Str;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('books')->delete();
        DB::table('members')->delete();
        DB::table('users')->delete();
        $user = User::create([
            'id' => Str::uuid(),
            'name' => 'Admin',
            'email' => 'admin@localhost',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(),
        ]);

        $user->member()->createMany([
           [
            'name' => 'Member 1',
            'email' => 'member1@localhost',
            'phone' => '1234567890',
            'address' => 'Address 1',
           ],
           [
            'name' => 'Member 2',
            'email' => 'member2@localhost',
            'phone' => '1234567890',
            'address' => 'Address 2',
           ],
        ]);

        $member = $user->member()->first();
        $member->books()->createMany([
            [
                'title' => 'Books 1',
                'author' => 'Author 1',
                'publisher' => 'Publisher 1',
                'status' => 'true',
            ],
            [
                'title' => 'Books 2',
                'author' => 'Author 2',
                'publisher' => 'Publisher 2',
                'status' => 'false',
            ],
        ]);
    }
}
