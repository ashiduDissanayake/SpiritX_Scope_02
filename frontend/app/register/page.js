                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className={styles.fieldError}>{errors.confirmPassword}</div>
              )}
            </div>
            
            <button 
              type="submit" 
              className={styles.registerButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        )}
        
        <div className={styles.loginLink}>
          Already have an account? <Link href="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}