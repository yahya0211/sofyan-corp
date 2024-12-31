<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $remember_token = $request->header('Authorization');
        $authenticate = true;

        if (!$remember_token) {
            $authenticate = false;
        }

        $user = User::where('remember_token', $remember_token)->first();

        if (!$user) {
            $authenticate = false;
        }else{
            Auth::login($user);
        }

        if ($authenticate) {
            return $next($request);
        }else{
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
    }
}
