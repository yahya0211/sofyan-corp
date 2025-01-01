<?php

namespace App\Http\Controllers;

use App\Http\Requests\BooksUpdateRequest;
use App\Http\Requests\CreateBookRequest;
use App\Http\Resources\BooksRecource;
use App\Models\Books;
use App\Models\Member;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BooksController extends Controller
{
    public function addBorrowingBooks(CreateBookRequest $request, string $id):JsonResponse {
        $dataValidated = $request->validated();

        // Temukan member berdasarkan ID
        $member = Member::where('id', $id)->first();

        if (!$member) {
            // Member tidak ditemukan
            throw new HttpResponseException(response()->json([
                'message' => 'Member not found',
            ], 404));
        }

        // Tambahkan buku dengan relasi ke Member dan User
        $books = new Books($dataValidated);
        $books->member_id = $member->id; // Relasi ke Member
        $books->save();

        return (new BooksRecource($books))->response()->setStatusCode(201);
    }

    public function getUserBooksId(string $id): JsonResponse {
        $member = Member::where('id', $id)->first();

        if (!$member) {
            throw new HttpResponseException(response([
                'message' => 'User not found'
            ])->setStatusCode(404));
        }

        $books = Books::where('member_id', $member->id)->get();

        $books = $books->map(function ($book) {
            $book->status = (bool) $book->status; 
            return $book;
        });

        return response()->json([
            'success' => true,
            'data' => BooksRecource::collection($books),
        ], 200);
    }

    public function updateBorrowingBooks(BooksUpdateRequest $request, string $id, string $member_id): JsonResponse {
        $dataValidated = $request->validated();
        $member = Member::where('id', $member_id)->first();

        if (!$member) {
            throw new HttpResponseException(response([
                'message' => 'User not found'
            ])->setStatusCode(404));
        }
        $books = Books::find($id);

        if (!$books) {
            throw new HttpResponseException(response([
                'message' => 'Book not found'
            ])->setStatusCode(404));
        }

        $books->status = $dataValidated['status'];
        $books->save();

        return (new BooksRecource($books))->response()->setStatusCode(201);
    }

    public function deleteBorrowingBooks(string $id, string $member_id): JsonResponse {
        $member = Member::where('id', $member_id)->first();

        if (!$member) {
            throw new HttpResponseException(response([
                'message' => 'User not found'
            ])->setStatusCode(404));
        }

        $books = Books::where('id', $id)->first();

        if (!$books) {
            throw new HttpResponseException(response([
                'message' => 'Book not found'
            ])->setStatusCode(404));
        }

        $books->delete();

        return response()->json([
            'success' => true,
            'message' => 'Book deleted successfully'
        ], 200);
    }
}
