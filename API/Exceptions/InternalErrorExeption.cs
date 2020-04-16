using System;
using Microsoft.AspNetCore.Mvc;

public class InternalErrorException : Exception
{
    public ProblemDetails problemDetails { get; private set; }

    public InternalErrorException (ProblemDetails problemDetails)
    {
        this.problemDetails = problemDetails;
    }
}
