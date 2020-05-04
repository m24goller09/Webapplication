﻿using System.Collections.Generic;
using IdentityServer4.Models;

namespace AuthServer
{
    public class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Email(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("resourceapi", "Resource API")
                {
                    Scopes = {new Scope("api.read")}
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client 
                {
                    RequireConsent = false,
                    ClientId = "angular_spa",
                    ClientName = "Angular SPA",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = { "openid", "profile", "email", "api.read" },
                    RedirectUris = { "http://promas.herokuapp.com/auth-callback", "http://localhost:4200/auth-callback" },
                    PostLogoutRedirectUris = {"http://promas.herokuapp.com/"},
                    AllowedCorsOrigins = { "http://promas.herokuapp.com/" ,"http://localhost:4200" },
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600
                },
                new Client
                {
                    ClientId = "postman",
                    ClientSecrets = { new Secret("secret".Sha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes = { "openid", "profile", "email", "api.read" },
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}
