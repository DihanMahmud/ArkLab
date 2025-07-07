'use client';

import { useState, useEffect } from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setUser, clearUser } from '@/store/slices/authSlice';
import { signIn, signOut, useSession } from 'next-auth/react';

export function AuthButton() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { data: session, status } = useSession();

  // Sync NextAuth session with Redux store
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const userData = {
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || '',
      };
      
      // Only dispatch if user data has changed
      if (!isAuthenticated || user?.id !== userData.id) {
        dispatch(setUser(userData));
      }
    } else if (status === 'unauthenticated' && isAuthenticated) {
      dispatch(clearUser());
    }
  }, [session, status, dispatch, isAuthenticated, user?.id]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await signIn('google', { 
        callbackUrl: window.location.origin,
        redirect: false 
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(clearUser());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state while session is being determined
  if (status === 'loading') {
    return (
      <Button disabled className="bg-gray-400">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (!isAuthenticated || status === 'unauthenticated') {
    return (
      <Button
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoggingIn ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4 mr-2" />
            Sign in with Google
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user?.name}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}