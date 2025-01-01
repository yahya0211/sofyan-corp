<?php

use App\Http\Controllers\BooksController;
use App\Http\Controllers\MemberController;
use App\Http\Middleware\LogMiddleware;
use Illuminate\Support\Facades\Route;


Route::middleware([LogMiddleware::class])->group(function () {
    Route::post('/member/addMember', [MemberController::class, 'addMember']);
    Route::get('/members', [MemberController::class, 'getAllMembers']);
    Route::get('/member/{id}', [MemberController::class, 'getMember']);
    Route::patch('/member/{id}/edit', [MemberController::class, 'editMember']);
    Route::delete('/member/{id}/delete', [MemberController::class, 'deleteMember']);

    Route::post('/books/{id}/addBook', [BooksController::class, 'addBorrowingBooks']);
    Route::get('/books/{id}/user', [BooksController::class, 'getUserBooksId']);
    Route::patch('/books/{id}/user/{member_id}/edit', [BooksController::class, 'updateBorrowingBooks']);
    Route::delete('/books/{id}/user/{member_id}/delete', [BooksController::class, 'deleteBorrowingBooks']);
});


