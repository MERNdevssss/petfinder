import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, Search, ArrowLeft, Heart } from 'lucide-react'

function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleSearchPets = () => {
    navigate('/search')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <Badge variant="destructive" className="text-sm">
                404 Error
              </Badge>
              <CardTitle className="text-4xl font-bold text-gray-800">
                Oops! Page Not Found
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-md mx-auto">
                The page you're looking for seems to have wandered off like a lost pet. 
                Don't worry, we'll help you find your way back home!
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-red-500" />
                Lost but not forgotten
              </div>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2">
              <Button 
                onClick={handleGoHome}
                className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
              
              <Button 
                onClick={handleGoBack}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
            </div>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need help? Contact our support team or visit our{' '}
                <button 
                  onClick={handleGoHome}
                  className="text-blue-600 hover:text-blue-800 underline font-medium"
                >
                  homepage
                </button>
                {' '}to get started.
              </p>
            </div>
          </CardContent>
        </Card>
        
       <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 text-gray-400">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound