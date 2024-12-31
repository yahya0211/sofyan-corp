<?php

use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabaseState;

uses(RefreshDatabaseState::class);

it('can create a new member', function () {
   $this->post('/api/members/addMember', [
       'name' => 'John Doe',
       'email' => 'johndoe@example.com',
       'phone' => '1234567890',
       'address' => 'Address 1',
       'user_id' => User::factory()->create()->id
   ]);

   $this->assertDatabaseHas('members', [
       'name' => 'John Doe',
       'email' => 'johndoe@example.com',
       'phone' => '1234567890',
       'address' => 'Address 1',
       'user_id' => User::factory()->create()->id
   ]);
});

it('cannot create a member without a user', function () {
    $this->post('/api/members/addMember', [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'phone' => '1234567890',
        'address' => 'Address 1',
    ])->assertStatus(422);
});




