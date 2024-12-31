<?php

use App\Http\Controllers\UserController;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Database\Seeders\LibrarySeeder;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Mockery\MockInterface;

uses(RefreshDatabaseState::class);

it('registers a new user successfully', function () {
    $requestData = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'securepassword',
    ];

    $mockRequest = Mockery::mock(UserRegisterRequest::class);
    $mockRequest->shouldReceive('validated')->andReturn($requestData);

    $controller = new \App\Http\Controllers\UserController();
    $response = $controller->register($mockRequest);

    $this->assertDatabaseHas('users', [
        'email' => 'johndoe@example.com',
    ]);

    $responseData = $response->getData(true);
    expect($responseData['email'])->toBe('johndoe@example.com');
});

it('throws error if email is already taken', function () {
    User::factory()->create([
        'email' => 'johndoe@example.com',
    ]);

    $requestData = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'securepassword',
    ];

    $mockRequest = $this->mock(\App\Http\Requests\UserRegisterRequest::class, function (MockInterface $mock) use ($requestData) {
        $mock->shouldReceive('validated')->andReturn($requestData);
    });

    $controller = new UserController();

    $this->expectException(HttpResponseException::class);
    $this->expectExceptionMessage('The email has already been taken.');

    $controller->register($mockRequest);
});

it('hashes the password correctly when registering a user', function () {
    $requestData = [
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
        'password' => 'securepassword',
    ];

    $mockRequest = $this->mock(\App\Http\Requests\UserRegisterRequest::class, function (MockInterface $mock) use ($requestData) {
        $mock->shouldReceive('validated')->andReturn($requestData);
    });

    $controller = new UserController();
    $controller->register($mockRequest);

    $user = User::where('email', 'johndoe@example.com')->first();
    expect(Hash::check('securepassword', $user->password))->toBeTrue();
});

it('logs in a user successfully', function () {
    // Membuat user baru
    $user = User::factory()->create([
        'email' => 'johndoe@example.com',
        'password' => Hash::make('securepassword'),
    ]);

    $requestData = [
        'email' => 'johndoe@example.com',
        'password' => 'securepassword',
    ];

    // Membuat instance UserLoginRequest dan mengisi data
    $request = new UserLoginRequest();
    $request->merge($requestData);

    // Menginisialisasi controller dan memanggil login
    $controller = new UserController();
    $response = $controller->login($request);

    // Mengecek respons
    $responseData = $response->getData(true);
    expect($responseData['email'])->toBe('johndoe@example.com');
});

it('throws error if login credentials are incorrect', function () {
    // Membuat user dengan password yang sudah di-hash
    $user = User::factory()->create([
        'email' => 'johndoe@example.com',
        'password' => Hash::make('securepassword'),
    ]);

    $requestData = [
        'email' => 'johndoe@example.com',
        'password' => 'securepassword',
    ];

    // Membuat instance UserLoginRequest dan mengisi data
    $request = new UserLoginRequest();
    $request->merge($requestData);

    // Menginisialisasi controller dan memanggil login
    $controller = new UserController();

    // Menangkap exception yang dilempar jika kredensial salah
    $this->expectException(HttpResponseException::class);
    $this->expectExceptionMessage('The provided credentials are incorrect.');

    $controller->login($request);
});

it('gets the current user successfully', function () {
    // Membuat user baru
   $this->seed([LibrarySeeder::class]);
    $user = User::where('email', 'admin@localhost')->first();

    // Menginisialisasi controller dan memanggil getUser
    $controller = new UserController();
    $response = $controller->getUser(new Request());

    // Mengecek respons
    $responseData = $response->getData(true);
    expect($responseData['email'])->toBe('admin@localhost');
});

it('updates the current user successfully', function () {
    // Membuat user baru
    $this->seed([LibrarySeeder::class]);
    $user = User::where('email', 'admin@localhost')->first();

    // Membuat instance UserUpdateRequest dan mengisi data
    $request = new UserUpdateRequest();
    $request->merge([
        'name' => 'John Doe',
        'email' => 'johndoe@example.com',
    ]);

    // Menginisialisasi controller dan memanggil update
    $controller = new UserController();
    $response = $controller->update($request);

    // Mengecek respons
    $responseData = $response->getData(true);
    expect($responseData['name'])->toBe('John Doe');
    expect($responseData['email'])->toBe('johndoe@example.com');
});

it('logs out the current user successfully', function () {
    // Membuat user baru
    $this->seed([LibrarySeeder::class]);
    $user = User::where('email', 'admin@localhost')->first();

    // Menginisialisasi controller dan memanggil logout
    $controller = new UserController();
    $response = $controller->logout(new Request());

    // Mengecek respons
    $responseData = $response->getData(true);
    expect($responseData['message'])->toBe('User logged out successfully.');
});
