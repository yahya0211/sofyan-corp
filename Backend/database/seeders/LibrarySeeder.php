<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data sebelumnya
        DB::table('books')->delete();
        DB::table('members')->delete();

        // Buat members
        $members = Member::insert([
            [
                'id' => Str::uuid(),
                'name' => 'Member 1',
                'email' => 'member1@localhost',
                'phone' => '1234567890',
                'address' => 'Address 1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Member 2',
                'email' => 'member2@localhost',
                'phone' => '1234567890',
                'address' => 'Address 2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Ambil semua member
        $members = Member::all();

        // Untuk setiap member, tambahkan buku
        foreach ($members as $member) {
            $member->books()->createMany([
                [
                    'title' => 'Books 1',
                    'author' => 'Author 1',
                    'publisher' => 'Publisher 1',
                    'status' => true, // Gunakan boolean
                ],
                [
                    'title' => 'Books 2',
                    'author' => 'Author 2',
                    'publisher' => 'Publisher 2',
                    'status' => false, // Gunakan boolean
                ],
            ]);
        }
    }
}
