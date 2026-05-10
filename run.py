"""
Script to run the LeadOps application
"""
import subprocess
import sys

def run_application():
    print("=" * 60)
    print("Running LeadOps Application")
    print("=" * 60)
    
    print("\n" + "=" * 60)
    print("1. Installing dependencies...")
    print("=" * 60)
    
    try:
        # Install npm packages
        result = subprocess.run(["npm", "install"], check=True)
        print("✅ Dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("2. Starting development server...")
    print("=" * 60)
    
    try:
        # Start dev server
        result = subprocess.run(["npm", "run", "dev"], check=False)
        print("✅ Application is running!")
        print("Open http://localhost:5173/ in your browser")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting server: {e}")
        return False
    
    return True

if __name__ == "__main__":
    try:
        run_application()
    except KeyboardInterrupt:
        print("\n\nApplication stopped by user")
    except Exception as e:
        print(f"\nError: {e}")