# apps/users/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
# Add to the bottom of apps/users/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        # Check that the two password fields match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        # Create the new user object
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ""),
            last_name=validated_data.get('last_name', "")
        )
        # Hash the password
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_staff'] = user.is_staff # Include admin status

        return token