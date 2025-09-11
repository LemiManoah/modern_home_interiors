<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
	/**
	 * Display a listing of the resource.
	 */
	public function index()
	{
		$users = User::query()->latest()->paginate(20);
		return Inertia::render('admin/users/index', [
			'users' => $users,
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create()
	{
		return Inertia::render('admin/users/form');
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(UserRequest $request)
	{
		$data = $request->validated();
		$data['password'] = Hash::make($data['password']);
		User::create($data);
		return redirect()->route('admin.users.index');
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user)
	{
		return Inertia::render('admin/users/form', [
			'user' => $user,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UserRequest $request, User $user)
	{
		$data = $request->validated();
		if (!empty($data['password'])) {
			$data['password'] = Hash::make($data['password']);
		} else {
			unset($data['password']);
		}
		$user->update($data);
		return redirect()->route('admin.users.index');
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user)
	{
		$user->delete();
		return back();
	}
}
